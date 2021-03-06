const React = require("react");
import { DefaultForestHooks, ForestApp, ForestHooksContext, useNavigate } from '@vdimensions/forest-js-react';
import { ForestGatsbyClient } from "./client";
import "/src/forest/views";

type GatsbyNavigatorProps = {
    template: string
}

const GatsbyNavigatorInner : React.FC<GatsbyNavigatorProps> = React.memo((props) => {
    console.debug("GatsbyNavigatorInner");
    const navigate = useNavigate();
    React.useEffect(() => {
        console.debug("GatsbyNavigator navigating to ", props.template);
        navigate(props.template);
    }, [props.template]);
    
    return (<>{props.children}</>);
});

const ForestPage = (props) => {
    const {template, data} = props.pageContext;
    
    const GatsbyNavigator : React.FC<any> = React.memo((props) => {

        console.debug("GatsbyNavigator");
        return (
            <ForestHooksContext.Provider value={DefaultForestHooks}>
                <GatsbyNavigatorInner template={template}>
                    {props.children}
                </GatsbyNavigatorInner>
            </ForestHooksContext.Provider>
        );
    });

    console.debug("ForestPage");

    return (
        <ForestApp 
            loadingIndicator={<span>LOADING</span>}
            client={new ForestGatsbyClient(data)}
            navigator={GatsbyNavigator}
            />
    );
};

export default ForestPage;