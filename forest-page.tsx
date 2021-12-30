const React = require("react");
import { ForestApp, useNavigate } from '@vdimensions/forest-js-react';
import { ForestGatsbyClient } from "./client";
import "/src/forest/views";



const ForestPage = (props) => {
    const {data} = props.pageContext;
    console.debug("ForestPage", data);
    
    const GatsbyNavigator : React.FC<any> = (props) => {
        const navigate = useNavigate();
        React.useEffect(() => {
            console.debug("GatsbyNavigator navigating to ", data.path);
            navigate(data.path);
        });
        
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

export default ForestPage;