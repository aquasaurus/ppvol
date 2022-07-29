<template>
    <div :class = "`flex flex-row items-center space-x-2`">
        <div class = "w-72 px-2 bg-white text-zinc-900 border border-gray-800 dark:border-gray-100 dark:bg-gray-700 dark:text-white flex flex-row space-x-4 items-center">
            <span class = "">{{prefix}}</span>
            <input type = "number" :placeholder="somePlaceholder" :id = "`text_field_${friendlyName.replace(/\s/g, '_')}`" v-model="myContent" class = "w-full h-8 p-2 bg-white focus:outline-0" @input="x => {$emit('update', myContent)}" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    content: {
        type: Number,
        default: () => null,

    },
    prefix: {
        type: String,
        default: () => "",

    },
    friendlyName: {
        type: String,
        default: () => "test"
        
    },
    somePlaceholder: {
    type: String,
    default: () => null
}
})
const myContent = ref(props.content)
</script>