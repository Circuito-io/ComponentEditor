export const svguiSchema = {

};

export const svgSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            title: "Name"
        },
        width: {
            type: "integer"
        },
        height: {
            type: "integer"
        },
        color: {
            type: "string"
        },
        pinTypes: {
            type: "string",
            enum: ["pads", "headers"]
        },
        pins: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    type: {
                        type: "string",
                        enum: ["male", "female"]
                    }
                }
            }
        }

    }
};
