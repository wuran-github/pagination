var template = `
<table class="table">
            <thead>
                <tr>
                    <th v-for="head in thead">
                        {{head}}
                    </th>
                    <th v-if="editModel.editable">edit</th>
                    <th v-if="deleteModel.deletable">edit</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list">
                    <td v-for="property in item">{{property}}</td>
                    <td v-if="editModel.editable"><a :href='editModel.url+item.id'>edit</a></td>
                    <td v-if="deleteModel.deletable"><a :href='deleteModel.url+item.id'>delete</a></td>
                    </tr>
            </tbody>
        </table>
`;

Vue.component("data-list", {
    props:
    {
        thead: {
            default:
                ["name", "age"],
        },
        list: {
            default:
                null
        },
        editModel: {
            default: {
                editable: false,
                url: "",

            }
        },
            deleteModel: {
                default: {
                    deletable: false,
                    url: "",

                },
            },
        },
        template: template,
        data: function () {
            return {

            }
        },
        computed: {

        },
        watch: {

        },
        methods: {

        },
    });