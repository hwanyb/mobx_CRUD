import { Form, Input, InputNumber } from "antd";
import { useState } from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  setData,
  ...restProps
}) => {
  // const [newRecord, setNewRecord] = useState({...record});
  const inputNode =
    inputType === "number" ? (
      <InputNumber
        value={children}
        onChange={(e) => onDataChange(e)}
        id={dataIndex}
        controls={false}
      />
    ) : (
      <Input
        value={children}
        onChange={(e) => onDataChange(e)}
        id={dataIndex}
      />
    );

  function onDataChange(e) {
    const { id, value } = e.target
    if(id === "name") {
      setData({
        ...record,
        name: value
      })
    } else if(id === "age") {
      if(!isNaN(e.nativeEvent.data)){
        setData({
          ...record,
          age: value
        })
      } else return;
      
    } else if(id === "gender") {
      setData({
        ...record,
        gender: value
      })
      
    } else if(id === "signup_date") {
      setData({
        ...record,
        signup_date: value
      })
      
    }
    console.log(isNaN(e.nativeEvent.data));
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
