export default {
    list: async () => {
        const customers = [
            { id: 1, name: 'John Doe', email: 'john@doe.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@doe.com' },
            { id: 3, name: 'Jim Doe', email: 'bob@doe.com' }
        ];
        return customers;
    },

    create: async ({ body }: { 
        body: { 
            id: number; 
            name: string; 
            email: string; 
        } 
    }) => {
        return body;
    },

    update: async ({ body, params }: { 
        body: { 
            name: string; 
            email: string; 
        }, 
        params: { 
            id: number; 
        } 
    }) => {
        return { body: body, id: params.id }; 
    },

    // แก้ไข: เพิ่ม async ให้กับฟังก์ชัน remove
    remove: async ({ params }: { 
        params: { 
            id: number 
        } 
    }) => {
        return { id: params.id };
    }
}
