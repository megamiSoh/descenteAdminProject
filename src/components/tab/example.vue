<template>
<div>
         <p>{{ count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </p>
  </div>
</template>
<script>

export default {
    name: 'example',
    data () {
        return { 

        }
       
    },
    created(){
        // console.log(this.$store1.state)
    },
    computed: {
            count(){
                return this.$store1.state
            },
    //         ...mapGetters([
    //   'count',
      
    // ])
        },
        methods: {
    increment () {
      this.$store1.commit('increment')
    },
    decrement () {
    	this.$store1.commit('decrement')
    }
  }
}
    
</script>