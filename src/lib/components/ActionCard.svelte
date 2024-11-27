<script>
  export let action;
</script>

<div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div class="space-y-2">
      <h3 class="text-base sm:text-lg text-gray-500 font-bold">{action.title}</h3>
      <p class="text-sm text-blue-600">{action.subtitle}</p>
      <p class="text-sm text-gray-500">{action.description}</p>
    </div>
    <div class="flex flex-col space-y-2 min-w-[140px]">
      <div class="w-full bg-gray-200 rounded-full h-2 sm:h-3">
        <div
          class="bg-green-500 h-full rounded-full transition-all duration-300"
          style="width: {action.progress}%"
        ></div>
      </div>
      <p class="text-xs sm:text-sm text-gray-500">{action.time}</p>
    </div>
  </div>
</div>
