import { Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  data,
  setData,
  ...restProps
}) => {
  useEffect(() => {
    if (data !== undefined) {
      setData({ ...record });
    }
  }, [editing]);

  const inputNode =
    inputType === "number" ? (
      <Input
        type="number"
        value={children}
        onChange={(e) => onDataChange(e, dataIndex)}
      />
    ) : (
      <Input value={children} onChange={(e) => onDataChange(e, dataIndex)} />
    );

  function onDataChange(e, id) {
    const {
      target: { value },
    } = e;
    if (id === "name") {
      setData({
        ...data,
        name: value,
      });
    } else if (id === "age") {
      if (isNaN(e.nativeEvent.data) === false) {
        setData({
          ...data,
          age: value,
        });
      } else return;
    } else if (id === "gender") {
      setData({
        ...data,
        gender: value,
      });
    } else if (id === "signup_date") {
      setData({
        ...data,
        signup_date: value,
      });
    } else if (id === "email") {
      setData({
        ...data,
        email: value,
      });
    } else return;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `회원 ${title}를 입력해 주세요.`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
