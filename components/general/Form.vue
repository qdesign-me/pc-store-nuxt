<template>
  <form @submit.prevent.stop="submit" @input="input" novalidate>
    <slot />
  </form>
</template>

<script setup>
const props = defineProps(['model', 'onFinish']);
const rules = reactive({});
const errors = reactive({});

const registerRule = (name, rule) => {
  rules[name] = rule;
};
const unregisterRule = (name) => {
  delete rules[name];
};
provide('form', {
  registerRule,
  unregisterRule,
  errors,
});

const checkErrors = (input = null) => {
  if (input) {
    delete errors[input];

    rules[input]?.reduce((acc, it) => {
      errors[input] = undefined;
      const value = props.model[input];

      if (it.required && !value?.length) {
        errors[input] = { ...errors[input], required: true };
      }

      if (it.phone && value?.length > 0 && value?.length < 19) {
        errors[input] = { ...errors[input], phone: true };
      }

      if (it.email && value?.length > 0 && !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(value)) {
        errors[input] = { ...errors[input], email: true };
      }
    }, {});
  } else {
    Object.keys(rules).forEach((item) => {
      rules[item]?.reduce((acc, it) => {
        delete errors[item];
        const value = props.model[item];
        if (it.required && !value?.length) {
          errors[item] = { ...errors[item], required: true };
        }

        if (it.phone && value?.length > 0 && value?.length < 19) {
          errors[input] = { ...errors[input], phone: true };
        }

        if (it.email && value?.length > 0 && !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(value)) {
          errors[item] = { ...errors[item], email: true };
        }
      }, {});
    });
  }
};

const input = (event) => {
  checkErrors(event.target.name);
  return false;
};
const submit = (event) => {
  checkErrors();
  const isValid = Object.keys(errors).length === 0;
  if (isValid) {
    return props.onFinish(props.model);
  }

  const name = Object.keys(errors)[0];
  const el = document.querySelector(`[name=${name}]`);

  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
