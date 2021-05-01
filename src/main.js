import * as Vue from "vue/dist/vue.esm-browser";

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query($search: String){
    Page(perPage: 22) {
      pageInfo {
        total
      }
      media(search: $search , type: MANGA, isAdult: false) {
        id
        title {
          romaji
        }
        description(asHtml: true)
        coverImage {
          large
        }
      }
    }
  }
`;






const datos = {
  data() {
    return {
      variables: {
        search: "Monster",
      },
      ResponseQuery: {},
      ResponseDo: false
    };
  },
  computed: {
    queryOptions() {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: this.variables,
        }),
      };
    },
  },

  methods: {
    SearchQuery() {
      fetch("https://graphql.anilist.co", this.queryOptions)
        .then((response) => (response.json()))
        .then((data) => (this.ResponseQuery = data.data))
        .catch((error) => console.log(error + "hola"));
        this.ResponseDo = true
    },
  },
};

const app = Vue.createApp(datos);
app.mount("#app");
