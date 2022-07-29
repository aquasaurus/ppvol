<template>
    <div :class = "`flex flex-row items-center space-x-2`">
            <label :for = "`choice_${caption.replace(/\s/g, '_')}`" :class = "`p-2 transition duration-200 ease-in-out w-4 h-4 ${chosen ? 'bg-sky-500 dark:bg-sky-500' : 'bg-blue-100 dark:bg-gray-700 '}`" />
            <input type = "checkbox" :id = "`choice_${caption.replace(/\s/g, '_')}`" class = "hidden" @change="x => {notChosen(); $emit('update', chosen)}" />
    </div>
</template>
<script setup>
defineProps({
    caption: {
        type: String,
        default: null,
    },
})
const chosen = ref(null)

function notChosen() {
    chosen.value = !chosen.value;
}
</script>