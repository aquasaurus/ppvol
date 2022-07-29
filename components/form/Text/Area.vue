<template>
    <div :class = "`flex flex-row items-center space-x-2`">
            <textarea :placeholder="somePlaceholder" :id = "`text_area_${friendlyName.replace(/\s/g, '_')}`" v-model="myContent" class = "w-72 h-24 p-2 bg-white text-zinc-900 border border-gray-800 dark:border-gray-100 dark:bg-gray-700 dark:text-white" @input="x => {$emit('update', myContent)}" />
    </div>
</template>
<script setup>
const props = defineProps({
    content: {
        type: String,
        default: () => null,

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