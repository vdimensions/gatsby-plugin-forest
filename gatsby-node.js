const fs = require("fs");
const path = require("path");

let options = { }

const loadTemplate = (path) => {
    return JSON.parse(fs.readFileSync(path));
}

exports.pluginOptionsSchema = ({ Joi }) => {
    return Joi.object({
        location: Joi.string().required()
    })
}

exports.onPreInit = (_, pluginOptions) => {
    options = pluginOptions;
}

exports.sourceNodes = async ({ actions, createContentDigest }) => {
    console.log("sourceNodes");
    const nodeData = {
        title: "Forest Node",
        description: "A node representing a forest template",
    };

    var templateFiles = fs.readdirSync(options.location)
        .filter(file => path.extname(file).toLowerCase() === ".json")
        .map(
            x => ({ 
                template: x.substr(0, x.length - path.extname(x).length), 
                data: loadTemplate(path.join(options.location, x)) 
            }));


    for (const i in templateFiles) {
        const nodeContent = templateFiles[i];
        const newNode = {
            ...nodeData,
            id: `ForestNode-${nodeContent.template}`,
            internal: {
                type: "ForestNode",
                contentDigest: createContentDigest(nodeContent),
                content: JSON.stringify(nodeContent)
            },
        }
        actions.createNode(newNode);
        console.log(`sourceNodes: newNode: ${JSON.stringify(newNode)}`);
    }
}
exports.onCreateNode = ({ node, actions }) => {
    console.log(`onCreateNode: ${node.internal.type}`);
    if (node.internal.type === "ForestNode") {
        console.log(`createNodeField: ${JSON.stringify(node)}`);
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data } = await graphql(
        `query {
            allForestNode {
                edges {
                    node {
                        id
                        internal {
                            type
                            content
                        }
                    }
                }
            }
        }`);
    data.allForestNode.edges.forEach(({ node }) => {
        var template = node.id.substr(node.internal.type.length + 1);
        var componentPath = path.resolve(`${__dirname}/forest-wrapper.tsx`);
        var templatePath = `/${template}`;
        console.log(`createPages::component path: ${componentPath}`);
        console.log(`createPages::template path: ${templatePath}`);
        var nodeContent = JSON.parse(node.internal.content);
        createPage({
            path: templatePath,
            component: componentPath,
            context: {
                template,
                data: nodeContent.data,
            },
        })
    });
}