const React = require("react");
import { ForestApp } from '@vdimensions/forest-js-react';
import { ForestGatsbyClient } from "./client";
import "/src/forest/views";

const ForestWrapper = (props) => {
    const {data} = props.pageContext;
    return (
        <ForestApp 
            loadingIndicator={<span>LOADING</span>}
            client={new ForestGatsbyClient(data)}
            />
    );
};

export default ForestWrapper;