<script>
  export let progress;
  export let label;
</script>

<div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
  <div class="space-y-3">
    <h2 class="text-base sm:text-lg text-gray-500 font-bold">{label}</h2>
    <div class="w-full bg-gray-200 rounded-full h-3 sm:h-4">
      <div
        class="bg-green-500 h-full rounded-full transition-all duration-300"
        style="width: {progress}%"
      ></div>
    </div>
  </div>
</div>
