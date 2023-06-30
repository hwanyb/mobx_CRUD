import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Form, Spin, Table, Tooltip } from "antd";
import EditableCell from "./EditableCell";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import EmptyTable from "./common/EmptyTable";
import Loading from "./common/Loading";

const MemberTable = ({ memberStore }) => {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState({});

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    memberStore.fetchMembers();
  }, []);

  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "나이",
      dataIndex: "age",
      key: "age",
      editable: true,
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      editable: true,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "가입일",
      dataIndex: "signup_date",
      key: "signup_date",
      editable: true,
    },
    {
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <>
                <Tooltip title="수정 완료">
                  <Button onClick={onDoneClick}>
                    <CheckOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="수정 취소">
                  <Button onClick={() => setEditingKey("")}>
                    <CloseOutlined />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="회원정보 수정">
                  <Button onClick={() => onEditClick(record)}>
                    <EditOutlined />
                  </Button>
                </Tooltip>
              </>
            )}
            <Tooltip title="회원정보 삭제">
              <Button danger onClick={(r) => onDeleteClick(record)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const mergedCol = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "age" || col.dataIndex === "signup_date"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        data: data,
        editingKey: editingKey,
        setData: setData,
      }),
    };
  });

  const onAddClick = () => {
    memberStore.addMember().then((key) => {
      setEditingKey(key);
    });
  };

  function onEditClick(record) {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  }
  function onDoneClick() {
    if (Object.keys(data).length === 0) {
      setEditingKey("");
    } else {
      const result = window.confirm("정보를 수정하시겠습니까?");
      if (result) {
        if (
          data.name === "" ||
          data.age === null ||
          data.signup_date === null ||
          data.email === "" ||
          data.gender === ""
        ) {
          window.alert("정보를 모두 입력해 주세요.");
        } else {
          memberStore.updateMember(data);
          setEditingKey("");
          setData({});
        }
      } else return;
    }
  }
  function onDeleteClick(record) {
    const result = window.confirm(
      `${record.name} 회원의 정보를 삭제하시겠습니까?`
    );
    if (result) {
      memberStore.deleteMember(record.key);
    } else return;
  }

  return (
    <ConfigProvider renderEmpty={() => <EmptyTable />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 0,
          padding: "5rem",
          width: "100vw",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Button
          style={{
            width: "fit-content",
            marginBottom: "2rem",
            padding: "0 3rem",
          }}
          type="primary"
          onClick={onAddClick}
          icon={<PlusOutlined />}
        >
          회원 추가
        </Button>

        <Form component={false} form={form}>
          <Table
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
            loading={
              memberStore.isLoading
                ? {
                    indicator: <Loading />,
                  }
                : false
            }
            columns={mergedCol}
            dataSource={memberStore.members}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
          />
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default inject("memberStore")(observer(MemberTable));
