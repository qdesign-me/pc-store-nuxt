<template>
  <form @submit.prevent="submit" @input="input">
    <slot />
  </form>
</template>

<script setup>
const props = defineProps(['model']);
const rules = reactive({});
const errors = reactive({});

const registerRule = (name, rule) => {
  rules[name] = rule;
};
provide('form', {
  registerRule,
  errors,
});

const checkErrors = (mode) => {
  Object.keys(rules).forEach((item) => {
    rules[item].reduce((acc, it) => {
      errors[item] = undefined;
      const value = props.model[item];

      if (mode === 'input' && value === undefined) {
      } else {
        if (it.required && !value?.length) {
          errors[item] = { ...errors[item], required: true };
        }

        if (it.email && !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(value)) {
          errors[item] = { ...errors[item], email: true };
        }
      }
    }, {});
  });
};

const input = (data) => {
  checkErrors('input');
};

const submit = () => {
  checkErrors('submit');
};
</script>
