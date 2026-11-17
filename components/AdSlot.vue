<template>
  <div 
    class="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl p-4 text-center transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-600 group overflow-hidden"
    :class="containerClasses"
    :style="customStyle"
    role="complementary"
    aria-label="Рекламный блок"
  >
    <!-- Фоновый водяной знак / паттерн -->
    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-slate-100/30 dark:via-slate-800/10 to-transparent pointer-events-none"></div>

    <!-- Метка рекламного места (Badge) -->
    <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
      <i class="bi bi-badge-ad text-xs"></i>
      <span>{{ label || 'Рекламное место' }}</span>
      <span v-if="slotId" class="text-slate-500 font-mono">#{{ slotId }}</span>
    </div>

    <!-- Контент плейсхолдера -->
    <div class="flex flex-col items-center gap-1.5 z-10">
      <div class="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform duration-200">
        <i class="bi bi-megaphone-fill text-lg"></i>
      </div>
      <p class="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {{ title || 'Место для баннера партнёра (Google AdSense / РСЯ)' }}
      </p>
      <p class="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
        {{ dimensionsText }}
      </p>
    </div>

    <!-- Нижняя строка: дисклеймер / ссылка -->
    <div class="mt-3 flex items-center justify-between w-full max-w-xs text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2 z-10">
      <span>Размещение рекламы: ads@linguo.by</span>
      <span class="hover:underline cursor-pointer">Подробнее &rarr;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdSlot',
  props: {
    // Пресет размера: 'banner' (горизонтальный), 'sidebar' (прямоугольник), 'leaderboard' (длинный), 'card' (компактный)
    format: {
      type: String,
      default: 'banner',
      validator: (val) => ['banner', 'sidebar', 'leaderboard', 'card', 'custom'].includes(val)
    },
    // Кастомные размеры
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    // Текстовая метка
    label: {
      type: String,
      default: 'Рекламный блок'
    },
    // Заголовок в блоке
    title: {
      type: String,
      default: ''
    },
    // Идентификатор слота (для AdSense / счетчиков)
    slotId: {
      type: String,
      default: ''
    }
  },
  computed: {
    containerClasses() {
      switch (this.format) {
        case 'leaderboard':
          return 'w-full max-w-4xl min-h-[90px] my-6';
        case 'sidebar':
          return 'w-full sm:w-[300px] min-h-[250px] my-4';
        case 'card':
          return 'w-full min-h-[140px] my-3';
        case 'banner':
        default:
          return 'w-full min-h-[120px] my-6';
      }
    },
    customStyle() {
      const style = {};
      if (this.width) style.width = this.width;
      if (this.height) style.minHeight = this.height;
      return style;
    },
    dimensionsText() {
      switch (this.format) {
        case 'leaderboard':
          return 'Формат: Leaderboard (728 × 90 px / адаптивный)';
        case 'sidebar':
          return 'Формат: Medium Rectangle (300 × 250 px)';
        case 'card':
          return 'Формат: In-feed Card (нативный блок)';
        case 'banner':
        default:
          return 'Формат: Responsive Banner (100% × 120 px)';
      }
    }
  }
};
</script>
