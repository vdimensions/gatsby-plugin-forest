const React = require("react");
import { ForestApp, useNavigate } from '@vdimensions/forest-js-react';
import { ForestStore } from '@vdimensions/forest-js-react/dist/store';
import { ForestGatsbyClient } from "./client";
import "/src/forest/views";



const ForestWrapper = (props) => {
    const {data} = props.pageContext;
    const GatsbyNavigator : React.FC<{store: ForestStore}> = (props) => {
        const navigate = useNavigate();
        navigate(data.path);
        return (<>{props.children}</>);
    }
    return (
        <ForestApp 
            loadingIndicator={<span>LOADING</span>}
            client={new ForestGatsbyClient(data)}
            navigator={GatsbyNavigator}
            />
    );
};

export default ForestWrapper;