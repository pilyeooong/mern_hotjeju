import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { getBase64FromFile } from "../Utils/base64";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, Upload, Modal, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const PlaceForm = styled(Form)`
  width: 100%;
`;
function AddPlaceForm() {
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });

  useEffect(() => {
    console.log(fileList);
  },[fileList]);

  const handleUploadChange = ({ fileList }) => {
    // fileList.map((file) => {
    //   setFileList(file.originFileObj);
    // })
    setFileList(fileList);
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !FileReader.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const onFinish = async (values) => {
    const {
      name,
      description,
      images: { fileList },
      address
    } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    try {
      await Axios.post('/api/places/new', formData);
      history.push("/");
    } catch (error) {
        console.log("error");
      }
    }

  return (
    <Wrapper>
      <Helmet>
        <title>핫플 추가하기 | Hot Jeju</title>
      </Helmet>
      <PlaceForm {...layout} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "내용을 입력해 주세요" }]}
          hasFeedback
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Image"
          name="images"
          rules={[{ required: true, message: "사진은 필수 항목입니다." }]}
          hasFeedback
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => {
              return false;
            }}
            onChange={handleUploadChange}
            onPreview={handlePreviewPhoto}
          >
            {fileList.length > 2 ? null : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "장소를 입력해 주세요" }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "장소를 입력해 주세요" }]}
          hasFeedback
        >
          <Input />
        </Form.Item>


        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Modal
          visible={previewPhoto.visible}
          footer={null}
          onCancel={() => setPreviewPhoto({ visible: false })}
        >
          <img
            src={previewPhoto.base64}
            style={{ width: "100%" }}
            alt="Preview"
          />
        </Modal>
      </PlaceForm>
    </Wrapper>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

export default AddPlaceForm;
