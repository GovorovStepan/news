import React from "react";
import { Card, Space, Tag } from 'antd';
import { Link } from "react-router-dom";

function ArticlePreview(props) {
  return (
    <React.Fragment>
          <Card 
          title={<h3 style={{textWrap:'wrap',   width: '90%'}}>{props.title}</h3>}
          extra={<Space><Tag color="volcano">{props.topic}</Tag> <Tag color="geekblue">{props.source}</Tag></Space>}
          actions={[
            <span key="pub_date">{props.pub_date}</span>,
            <Link to={'/news/'+props.id}> Read</Link>,
          ]}
          >
            <p style={{textOverflow: 'ellipsis', overflow: 'hidden', textWrap: "nowrap" }}>
              {props.children}
            </p>
          </Card>
          <br/>
    </React.Fragment>
  );
};


export default ArticlePreview