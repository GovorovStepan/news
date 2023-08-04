import React, { useState, useEffect } from "react";
import { notification, Spin, Col, Row, Space, Tag, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import articles from "../../data/models/articles";

import topics from "../../data/models/topics";
import sources from "../../data/models/sources";


function Article() {
  const [article, setArticle] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();

  useEffect(() => {
    articles.get_by_id(id, onSuccsess, onError);

  }, []);

  const onSuccsess = (response) => {
    setArticle(response.data);
    setParagraphs(response.data.text.split('\\n\\n'));
    topics.get_by_id(response.data.topic_id, onSuccsessGetTopic, onError);
    sources.get_by_id(response.data.source_id, onSuccsessGetSource, onError);
  }


  const onSuccsessGetTopic = (response) => {
    setTopicName(response.data.name);
  }
  const onSuccsessGetSource = (response) => {
    setSourceName(response.data.name);
  }


  const onError = (error) => {
    api.error({
      message: 'Error',
      description: error.message,
    });
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Spin spinning={loading} size="large">
        {contextHolder}
        <Row style={{ marginTop: 20, marginBottom: 40 }}>
          <Col xs={2} md={4} lg={6}>
          </Col>
          <Col xs={20} md={16} lg={12}>
            <h1>{article.title}</h1>
            <Divider><Space>
              <Tag color="volcano">{topicName}</Tag>
              <Tag color="geekblue">{sourceName}</Tag>
            </Space></Divider>
            <br />
            <article >
              {paragraphs.map(el => {
                  return <p>
                    {el}
                  </p>
                })}
            </article >
            <br />
            <Space>
              <span><b>{article.publishedAt}</b></span>
              <span><b>{article.author}</b></span>
            </Space>
          </Col>
          <Col xs={2} md={4} lg={6}></Col>
        </Row>
      </Spin>
    </React.Fragment>
  );
};


export default Article