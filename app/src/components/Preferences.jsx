import React, { useEffect, useState } from "react";
import { Card, Select, notification, Spin, Button, Space } from 'antd';
import preferences from "../data/models/preferences";


function Preferences(props) {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    props.optionsGetter(onSuccsessGetOptions, onError);
    props.preferencesGetter(onSuccsessGetPreferences, onError);
  }, []);


  const onError = (error) => {
    console.error(error);
    api.error({
      message: 'Error',
      description: error.message,
    });
    setLoading(false);
  }

  const onSuccsessGetOptions = (response) => {
    setOptions(response.data.map((el) => {
      return { value: el.id, label: el.name }
    }));
  }

  const onSuccsessGetPreferences = (response) => {
    setSelectedItems(response.data)
    setLoading(false)
  }
  const onSuccsessSetPreferences = (response) => {
    setLoading(false)
    api.success({
      message: 'Success'
    });
    setLoading(false);
  }

  const onSubmitClick = () => {
    setLoading(true)
    preferences.set({'ids' : selectedItems, 'type': props.type}, onSuccsessSetPreferences, onError)
  }

  return (
    <Spin spinning={loading} size="large">
      <Card title={props.title}  >
        {contextHolder}
        <Space direction="vertical" style={{
          width: '100%',
        }}>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            value={selectedItems}
            onChange={setSelectedItems}
            options={options}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
          <Button type="primary" onClick={onSubmitClick}>Submit</Button>

        </Space>
      </Card>
    </Spin>
  );
};


export default Preferences