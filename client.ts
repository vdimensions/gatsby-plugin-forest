import { IForestClient, ForestResponse } from '@vdimensions/forest-js-frontend';

export class ForestGatsbyClient implements IForestClient {

    private views: [];

    constructor(views: []) {
        this.views = views;
    }

    navigate: (path: string) => Promise<ForestResponse> = async (path) => {
        return new ForestResponse({ 
            path, 
            views: this.views 
        });
    }
    invokeCommand: (instanceId: string, command: string, arg?: any) => Promise<ForestResponse> = () => {
        throw new Error("Forest commands are not supported in gatsby");
    }

}