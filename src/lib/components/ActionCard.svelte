<script>
  export let action;
</script>

<div class="bg-white p-6 rounded-lg shadow-sm flex items-start justify-between">
  <div>
    <h3 class="text-lg font-bold">{action.title}</h3>
    <p class="text-sm text-blue-600 mt-2">{action.subtitle}</p>
    <p class="text-gray-500 mt-1">{action.description}</p>
  </div>
  <div class="flex flex-col items-end">
    <div class="w-32 bg-gray-200 rounded-full h-3">
      <div
        class="bg-green-500 h-3 rounded-full"
        style="width: {action.progress}%"
      ></div>
    </div>
    <p class="text-sm text-gray-500 mt-2">{action.time}</p>
  </div>
</div>
