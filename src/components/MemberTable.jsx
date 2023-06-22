import { inject, observer, useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import useStore from "../useStore";
import { Button, Form, Table, Tooltip } from "antd";
import EditableCell from "./EditableCell";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const MemberTable = () => {
  const { memberStore } = useStore();
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");

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
                  <Button>
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
      }),
    };
  });



    const onAddClick = () => {
    memberStore.addMember();
   
    // onEditClick({
    //   age: null,
    //   email: "",
    //   gender: "",
    //   name: "",
    //   signup_date: null,
    //   key: memberStore.newMemberKey,
    // });
    // console.log(memberStore.newMemberKey)
    // console.log(memberStore.member)
  }

  function onEditClick(record) {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  }

  function onDeleteClick(record) {
    const result = window.confirm(
      `${record.name} 회원의 정보를 삭제하시겠습니까?`
    );
    if (result) {
      memberStore.deleteMember(record.key);
    } else return;
  }


  return useObserver(() => (
   <>
      <Button type="primary" onClick={onAddClick}>회원 추가</Button>

    <Form component={false} form={form}>
      <Table
        columns={mergedCol}
        dataSource={memberStore.members}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
   </>
  ));
};

export default MemberTable;
