<template>
    <div class="about">
        <h1>Your random entity is {{result}}</h1>
        <button class="go" v-on:click="go">Go</button>
    </div>
</template>

<script>
    import Api from '@/api'

    export default {
        data: () => ({
            result: ''
        }),
        methods: {
            go: function () {
                return Api.randomEntity()
                    .then(response => {
                        console.log(response)
                        this.result = response.data.entries[0].API;
                        this.$toasted.show(response.data.entries[0].Link, {
                            type: 'info',
                            position: 'bottom-center',
                            duration: 2000
                        })
                    })
                    // .catch(err => {
                    //     console.log(err)
                    //     this.$toasted.show(err, {
                    //         type: 'error',
                    //         position: 'bottom-center',
                    //         duration: 2000
                    //     })
                    // })
            },
        }
    }
</script>
