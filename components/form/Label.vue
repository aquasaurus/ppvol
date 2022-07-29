<template>
  <label :for="`${prefix}_${friendlyName.replace(/\s/g, '_')}`">{{ friendlyName }}</label>
</template>
<script setup>
const {type} = defineProps(["friendlyName", "type"])

const prefix = type === "text" ? "text_field" : type === "checkbox" ? "choice" : type === "textarea" ? "text_area" : "form_element"
</script>