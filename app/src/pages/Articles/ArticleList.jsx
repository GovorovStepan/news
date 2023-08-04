import React, { useState, useEffect } from "react";
import { default as articlesModel } from "../../data/models/articles";
import { notification, Spin, Col, Row, Pagination } from 'antd';
import ArticleFilter from "../../components/ArticleFilter";
import ArticlePreview from "../../components/ArticlePreview";
import topics from "../../data/models/topics";
import sources from "../../data/models/sources";

function ArticleList() {
  const [articles, setArticles] = useState({});
  const [sourceOptions, setSourceOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [renderArticles, setRenderArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({ "page": 1});

  useEffect(() => {
    topics.list(onSuccsessGetTopics, onError);
    sources.list(onSuccsessGetSources, onError);

  }, []);

  useEffect(() => {
    setLoading(true);
    if (!Object.keys(articles).length) {
      articlesModel.search(searchParams, onSuccsessSearch, onError);
    } else {
      if (page in articles) {
        setRenderArticles(articles[page]);
        setLoading(false);
      } else {
        articlesModel.search(searchParams, onSuccsessPaginate, onError);
      }
    }
  }, [searchParams]);


  const onSuccsessGetTopics = (response) => {
    setTopicOptions(response.data.map((el) => {
      return { value: el.id, label: el.name }
    }));
  }
  const onSuccsessGetSources = (response) => {
    setSourceOptions(response.data.map((el) => {
      return { value: el.id, label: el.name }
    }));
  }

  const onError = (error) => {
    api.error({
      message: 'Error',
      description: error.message,
    });
    setLoading(false);
  }

  const onSuccsessSearch = (response) => {
    setArticles(articles => ({ ...articles, [page]: response.data.data }))
    setRenderArticles(response.data.data)
    setTotal(response.data.total)
    setLoading(false)
  }
  const onSuccsessPaginate = (response) => {
    setArticles(articles => ({ ...articles, [page]: response.data.data }))
    setRenderArticles(response.data.data)
    setLoading(false)
  }

  const handleSearch = (value) => {
    setArticles({})
    setPage(1)
    setSearchParams({
      ...searchParams,
      filters: value,
      page: 1
    })
  }

  const handlePaginate = (value) => {
    setPage(value);
    setSearchParams({
      ...searchParams,
      page: value
    })
  }

  const getTopicName = (id) => {
    return topicOptions.find((el) => el.value == id).label

  }
  const getSourceName = (id) => {
    return sourceOptions.find((el) => el.value == id).label
  }

  return (
    <React.Fragment>
      <Spin spinning={loading} size="large">
        {contextHolder}
        <Row style={{ marginTop: 20, marginBottom: 40 }}>
          <Col xs={2} md={4} lg={6}>
          </Col>
          <Col xs={20} md={16} lg={12}>
            <ArticleFilter onSearch={handleSearch} sourceOptions={sourceOptions} topicOptions={topicOptions} />
            <div>
              {
                renderArticles.map(el => {
                  return <ArticlePreview
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    topic={getTopicName(el.topic_id)}
                    source={getSourceName(el.source_id)}
                    pub_date={el.publishedAt}
                  >
                    {el.text.slice(0,150).replace('\\n\\n', '')}
                  </ArticlePreview>
                })
              }
            </div>
            <br />
            <Pagination
              current={page}
              total={total}
              pageSize={10}
              onChange={handlePaginate}
              showSizeChanger={false}
            />
          </Col>
          <Col xs={2} md={4} lg={6}></Col>
        </Row>
      </Spin>
    </React.Fragment>
  );
};


export default ArticleList