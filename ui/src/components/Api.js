import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
 
function Api() {
  return (
    <div>
    <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
    </div>
  );
}

export default Api;
