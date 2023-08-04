import React, { useState } from "react";
import { Select, Input, DatePicker, Button, Space } from 'antd';

const { RangePicker } = DatePicker;

function ArticleFilter(props) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [keyword, setKeyword] = useState('');


  const onSearchClick = () => {
    props.onSearch(defineSearchParams())
  }

  const defineSearchParams = () => {
    const params = {};
    if (selectedSources.length) {
      params.sources = selectedSources;
    }
    if (selectedTopics.length) {
      params.topics = selectedTopics;
    }
    if (selectedDates.length == 2) {
      params.dates = [modifyDate(selectedDates[0]), modifyDate(selectedDates[1])]
    }
    if (keyword) {
      params.keyword = keyword
    }
    return params
  }


  const modifyDate = (date) => {
    return date.set('hour', 0).set('minute', 0).set('second', 0).format()
  }


  return (
    <React.Fragment>
      <h2>Filter</h2>
      <Space.Compact block size="large">
        <Input
          placeholder="Input keyword"
          onChange={(e) => { setKeyword(e.target.value) }}
          value={keyword}
        />
        <RangePicker
          style={{ width: '100%' }}
          value={selectedDates}
          onCalendarChange={setSelectedDates} />
      </Space.Compact>
      <br />
      <Space.Compact block size="large">
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Sources"
          value={selectedSources}
          onChange={setSelectedSources}
          options={props.sourceOptions}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Topics"
          value={selectedTopics}
          onChange={setSelectedTopics}
          options={props.topicOptions}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Space.Compact>
      <br />
      <Space.Compact block size="large">
        <Button block type="primary" onClick={onSearchClick}>Search</Button>
      </Space.Compact>
      <br />
    </React.Fragment>
  );
};


export default ArticleFilter