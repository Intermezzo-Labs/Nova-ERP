<script>
  export let progress;
  export let label;
</script>

<div class="bg-white p-4 rounded-lg shadow-sm">
  <h2 class="text-lg font-bold">{label}</h2>
  <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
    <div
      class="bg-green-500 h-4 rounded-full"
      style="width: {progress}%"
    ></div>
  </div>
</div>
