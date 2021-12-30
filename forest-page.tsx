const React = require("react");
import { ForestApp, useNavigate } from '@vdimensions/forest-js-react';
import { ForestGatsbyClient } from "./client";
import "/src/forest/views";



const ForestPage = (props) => {
    const {template, data} = props.pageContext;
    
    const GatsbyNavigator : React.FC<any> = (props) => {
        const navigate = useNavigate();
        React.useEffect(() => {
            console.debug("GatsbyNavigator navigating to ", template);
            navigate(template);
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