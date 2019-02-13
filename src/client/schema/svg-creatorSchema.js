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
            title: "Width [mm]",
            type: "integer"
        },
        height: {
            title: "Height [mm]",
            type: "integer"
        },
        color: {
            title: "Color",
            type: "string",
            default: "Red",
            enum: ['#CF2F27','#45925A', '#0B5597', '#000000','#338085' ],
            enumNames: ['Red','Green', 'Blue','Black', 'Ocean']
        },
        pinTypes: {
            title: "Pin Type",
            type: "string",
            default: "pads",
            enum: ["pads", "headers"]
        },
        pins: {
            type: "array",
            title: "Pins:",
            items: {
                type: "object",
                required: [
                "name",
                "type"
                ],
                properties: {
                    name: {
                        title: "Pin Name:",
                        type: "string"
                    },
                    type: {
                        title: "Pin Type:",
                        type: "string",
                        default: "male",
                        enum: ["male", "female"]
                    }
                }
            }
        }

    }
};
