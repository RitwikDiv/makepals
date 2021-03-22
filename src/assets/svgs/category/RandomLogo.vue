<template>
  <p class="card-meta text-muted">
    <strong>Random </strong>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :fill="color"
      class="bi bi-dice-4-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm1 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
    </svg>
  </p>
</template>

<script>
export default {
  name: "RandomLogo",
  props: {
    color: {
      type: String,
      default: "purple",
      required: false,
    },
    width: {
      type: Number,
      default: 16,
      required: false,
    },
    height: {
      type: Number,
      default: 16,
      required: false,
    },
  },
};
</script>