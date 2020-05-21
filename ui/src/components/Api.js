import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui';
import './Api.css'
import '../../node_modules/swagger-ui/dist/swagger-ui.css'

class Api extends Component {
    componentDidMount() {
        SwaggerUI({
          domNode: document.getElementById("api-data"),
          url: "http://"+window.location.hostname+":8000/api/?format=openapi"
        })
    }
    render(){
        return (
            <div className="Api">
              <div id="api-data" />
            </div>
        );
    }
}
export default Api;
