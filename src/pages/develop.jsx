import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router'; 

const NoFoundPage = () => (
  <Result
    status="404"
    title="developing"
    subTitle="Sorry, the page you visited is under developping."
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
