<template>
 <div class=" min-h-screen relative bg-gradient-to-br from-[#10151B] via-[#1C2230] to-[#10151B] text-white p-4 pb-0">
    <!-- Header -->
     <header class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0 text-center md:text-left">
      <div class="flex items-center space-x-2">
        <div class="rounded-md flex items-center justify-center">
          <!-- المربع الكامل 3x3 -->
          <div
            class="w-16 h-16 bg-[#283033] grid grid-cols-3 grid-rows-3 gap-1 p-1.5 rounded-lg"
          >
            <div class="bg-[#43A1FA] w-full h-full rounded-sm"></div>
            <div class="bg-[#354748] w-full h-full rounded-sm"></div>
            <div class="bg-[#F5455C] w-full h-full rounded-sm"></div>
            <div class="bg-[#354748] w-full h-full rounded-sm"></div>
            <div class="bg-[#43A1FA] w-full h-full rounded-sm"></div>
            <div class="bg-[#354748] w-full h-full rounded-sm"></div>
            <div class="bg-[#F5455C] w-full h-full rounded-sm"></div>
            <div class="bg-[#F5455C] w-full h-full rounded-sm"></div>
            <div class="bg-[#F5455C] w-full h-full rounded-sm"></div>
          </div>
        </div>
        <div>
          <h1 class="text-xl font-bold">Tic Tac Toe</h1>
          <p class="text-sm font-bold text-[#cecece]">(XO) game</p>
        </div>
      </div>
      <!-- Controls -->
      <div class="flex space-x-2 items-center justify-center">
        <button
          @click="toggleFullscreen"
          class="px-3 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
        >
          <img
            src="../assets/imgs/expand.png"
            alt="Fullscreen"
            class="w-5 h-5"
          />
        </button>
        <div class="flex gap-2 bg-[#273039] px-4 py-2 rounded-lg">
          <button
            v-for="size in [3, 4, 5]"
            :key="size"
            @click="setBoardSize(size)"
            class="cursor-pointer"
            :class="[
              'px-3 py-1 rounded-md transition-colors',
              boardSize === size
                ? 'bg-[#21cfac] text-white'
                : 'bg-gray-700 hover:bg-gray-600',
            ]"
          >
            {{ size }}x{{ size }}
          </button>
        </div>
        <button
          @click="showAbout = true"
          class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          @click="resetGame"
          class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </header>
<!-- Scoreboard & Power-ups -->
<div class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-6 w-full px-2">
  <!-- Player 1 Power-ups -->
  <div class="bg-gray-800 rounded-lg p-4 w-full max-w-xs sm:max-w-sm">
    <div class="grid grid-cols-3 gap-4 place-items-center">
      <!-- Freeze -->
      <button
        @click="usePowerUp('freeze')"
        :disabled="
          currentPlayer !== 1 ||
          player1PowerUps.freeze <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 1 ||
          player1PowerUps.freeze <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/freeze.png" alt="Freeze" class="w-6 h-6" />
        <span class="text-xs mt-1">Freeze</span>
        <span
          v-if="player1PowerUps.freeze > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player1PowerUps.freeze }}
        </span>
      </button>
      <!-- Bomb -->
      <button
        @click="usePowerUp('bomb')"
        :disabled="
          currentPlayer !== 1 ||
          player1PowerUps.bomb <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 1 ||
          player1PowerUps.bomb <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/bomb.png" alt="Bomb" class="w-6 h-6" />
        <span class="text-xs mt-1">Bomb</span>
        <span
          v-if="player1PowerUps.bomb > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player1PowerUps.bomb }}
        </span>
      </button>
      <!-- Swap -->
      <button
        @click="usePowerUp('swap')"
        :disabled="
          currentPlayer !== 1 ||
          player1PowerUps.swap <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 1 ||
          player1PowerUps.swap <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/refresh.png" alt="Swap" class="w-6 h-6" />
        <span class="text-xs mt-1">Swap</span>
        <span
          v-if="player1PowerUps.swap > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player1PowerUps.swap }}
        </span>
      </button>
    </div>
  </div>
  <!-- Scoreboard -->
  <div class="bg-gray-800 rounded-lg p-4 w-full max-w-xs sm:max-w-sm text-center">
    <div class="flex justify-around gap-4 sm:gap-8">
      <div>
        <div class="text-xl sm:text-2xl font-bold text-red-400">{{ scores.p2 }}</div>
        <div class="text-xs sm:text-sm text-white font-bold">P1 WINS</div>
      </div>
      <div>
        <div class="text-xl sm:text-2xl font-bold text-yellow-400">{{ scores.draws }}</div>
        <div class="text-xs sm:text-sm text-white font-bold">DRAWS</div>
      </div>
      <div>
        <div class="text-xl sm:text-2xl font-bold text-blue-400">{{ scores.p1 }}</div>
        <div class="text-xs sm:text-sm text-white font-bold">P2 WINS</div>
      </div>
    </div>
  </div>
  <!-- Player 2 Power-ups -->
  <div class="bg-gray-800 rounded-lg p-4 w-full max-w-xs sm:max-w-sm">
    <div class="grid grid-cols-3 gap-4 place-items-center">
      <!-- Freeze -->
      <button
        @click="usePowerUp('freeze')"
        :disabled="
          currentPlayer !== 2 ||
          player2PowerUps.freeze <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 2 ||
          player2PowerUps.freeze <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/freeze.png" alt="Freeze" class="w-6 h-6" />
        <span class="text-xs mt-1">Freeze</span>
        <span
          v-if="player2PowerUps.freeze > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player2PowerUps.freeze }}
        </span>
      </button>
      <!-- Bomb -->
      <button
        @click="usePowerUp('bomb')"
        :disabled="
          currentPlayer !== 2 ||
          player2PowerUps.bomb <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 2 ||
          player2PowerUps.bomb <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/bomb.png" alt="Bomb" class="w-6 h-6" />
        <span class="text-xs mt-1">Bomb</span>
        <span
          v-if="player2PowerUps.bomb > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player2PowerUps.bomb }}
        </span>
      </button>
      <!-- Swap -->
      <button
        @click="usePowerUp('swap')"
        :disabled="
          currentPlayer !== 2 ||
          player2PowerUps.swap <= 0 ||
          currentPowerUp !== null
        "
        :class="[
          'p-2 rounded-md flex flex-col items-center justify-center transition-all w-16 h-16 relative',
          currentPlayer !== 2 ||
          player2PowerUps.swap <= 0 ||
          currentPowerUp !== null
            ? 'bg-[#2F3841] cursor-not-allowed opacity-50'
            : 'bg-[#2F3841] cursor-pointer hover:bg-gray-600',
        ]"
      >
        <img src="../assets/imgs/refresh.png" alt="Swap" class="w-6 h-6" />
        <span class="text-xs mt-1">Swap</span>
        <span
          v-if="player2PowerUps.swap > 0"
          class="text-xs bg-red-500 rounded-full px-1.5 absolute -top-1 -right-1"
        >
          {{ player2PowerUps.swap }}
        </span>
      </button>
    </div>
  </div>
</div>
    <!-- Game Board -->
    <div class="flex justify-center mb-6">
      <div
        class="border-2 border-[#E76B67] rounded-xl p-4 grid gap-2"
:style="{
  gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
  width: `${boardSize * 80}px`
}"
      >
        <div
          v-for="(cell, index) in board"
          :key="index"
          @click="handleCellClick(index)"
          :class="[
            'aspect-square rounded-lg flex items-center justify-center text-4xl font-bold transition-all duration-300',
            cell === ''
              ? currentPlayer.value === 1
                ? 'bg-pink-900 hover:bg-pink-700 cursor-pointer'
                : 'bg-cyan-900 hover:bg-cyan-700 cursor-pointer'
              : cell === 'X'
              ? 'text-cyan-400'
              : 'text-pink-400',
            winningCells.includes(index)
              ? 'ring-2 ring-yellow-400 animate-pulse'
              : '',
            currentPlayer === 1 && cell === ''
              ? 'border-2 border-cyan-400'
              : currentPlayer === 2 && cell === ''
              ? 'border-2 border-pink-400'
              : '',
          ]"
        >
          <div
            v-if="cell === 'X'"
            class="transform transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div
            v-if="cell === 'O'"
            class="transform transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="6" stroke-width="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Current Player Indicator -->
    <div class="flex justify-center space-x-8 mb-1">
      <div class="flex flex-col items-center">
        <div
          :class="[
            'flex flex-col items-center p-4 rounded-lg transition-all',
            currentPlayer === 1
              ? 'bg-cyan-500/20 ring-2 ring-cyan-400'
              : 'bg-gray-700',
          ]"
        >
          <div
            class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center"
          >
            <span class="flex text-2xl">X</span>
          </div>
        </div>
        <span class="mt-4">P2</span>
      </div>
      <div class="flex flex-col items-center">
        <div
          :class="[
            'flex flex-col items-center p-4 rounded-lg transition-all',
            currentPlayer === 2
              ? 'bg-pink-500/20 ring-2 ring-pink-400'
              : 'bg-gray-700',
          ]"
        >
          <div
            class="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center"
          >
            <span class="flex text-2xl">O</span>
          </div>
        </div>
        <span class="mt-4">P1</span>
      </div>
    </div>
    <!-- Game Over Modal -->
    <div
      v-if="gameOver"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-700 scale-95 animate-fadeIn"
      >
        <!-- العنوان -->
        <h2
          class="text-3xl font-extrabold mb-4 drop-shadow-sm transition-all duration-500"
          :class="{
            'text-cyan-400': winner === 2,
            'text-pink-400': winner === 1,
            'text-yellow-400': winner === 0,
          }"
        >
          {{
            winner === 1
              ? " Player 1 Wins!"
              : winner === 2
              ? " Player 2 Wins!"
              : " It's a Draw!"
          }}
        </h2>
        <!-- الرسالة -->
        <div class="mb-6">
          <p class="text-gray-300 text-lg">
            {{
              winner === 0
                ? "That was a close match!"
                : "Great job, challenger!"
            }}
          </p>
        </div>
        <!-- الأزرار -->
        <div class="flex justify-center space-x-4">
          <button
            @click="startNewRound"
            class="px-5 py-2.5 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-md font-semibold text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            New Round
          </button>
          <button
            @click="resetGame"
            class="px-5 py-2.5 cursor-pointer bg-[red] rounded-md font-semibold text-white shadow-lg transition-all duration-300"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
    <!-- About Modal -->
    <div
      v-if="showAbout"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-2xl">
        <h2 class="text-2xl font-bold mb-4">About Tic Tac Toe</h2>
        <div class="space-y-4 text-gray-300">
          <p>
            Play the classic Tic Tac Toe game with power-ups and enhanced
            features!
          </p>
          <h3 class="font-bold text-white">How to Play:</h3>
          <ul class="list-disc list-inside space-y-1">
            <li>
              Players take turns placing their mark (X or O) on the board.
            </li>
            <li>
              The first player to get 3 (or more, depending on board size) of
              their marks in a row wins.
            </li>
            <li>You can choose between 3x3, 4x4, or 5x5 boards.</li>
          </ul>
          <h3 class="font-bold text-white">Power-Ups:</h3>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Freeze:</strong> Skip your opponent's next turn.</li>
            <li><strong>Bomb:</strong> Remove any piece from the board.</li>
            <li><strong>Swap:</strong> Swap two pieces on the board.</li>
          </ul>
          <p>Use power-ups strategically to gain an advantage!</p>
        </div>
        <div class="mt-6 flex justify-end">
          <button
            @click="showAbout = false"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <!-- Power-Up Selection Modal -->
    <div
      v-if="currentPowerUp !== null"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl relative"
      >
        <h3 class="text-xl font-bold mb-4">
          Select Target for {{ currentPowerUp.toUpperCase() }}
        </h3>
        <div
          v-if="currentPowerUp === 'bomb'"
          class="flex flex-col items-center justify-center"
        >
          <p class="mb-4">Click on a cell to remove its piece.</p>
          <div
            class="grid gap-2 mb-4"
:style="{
  gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
  width: `${boardSize * 80}px`
}"
          >
            <div
              v-for="(cell, index) in board"
              :key="index"
              @click="
                currentPowerUp === 'bomb'
                  ? handleBombTarget(index)
                  : handleSwapTarget(index)
              "
              :class="[
                'aspect-square rounded-lg flex items-center justify-center text-xl font-bold transition-all',
                cell === 'X'
                  ? 'text-cyan-400 bg-gray-700'
                  : cell === 'O'
                  ? 'text-pink-400 bg-gray-700'
                  : 'bg-gray-600 cursor-not-allowed',
                currentPowerUp === 'bomb'
                  ? selectedCell === index
                    ? 'ring-2 ring-yellow-400'
                    : ''
                  : currentPowerUp === 'swap'
                  ? selectedCells.includes(index)
                    ? 'ring-2 ring-yellow-400'
                    : ''
                  : '',
              ]"
            >
              <div
                v-if="cell === 'X'"
                class="transform transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div
                v-if="cell === 'O'"
                class="transform transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="6" stroke-width="2" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Confirm Bomb button (added) -->
          <div class="flex gap-2">
            <button
              @click="applyBomb"
              :disabled="selectedCell === -1"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-md transition-colors"
            >
              Detonate Bomb
            </button>
            <button
              @click="cancelPowerUp"
              class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          v-if="currentPowerUp === 'swap'"
          class="flex flex-col items-center justify-center"
        >
          <p class="mb-4">Click on two cells to swap their pieces.</p>
          <div
            class="grid gap-2 mb-4"
:style="{
  gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
  width: `${boardSize * 80}px`
}"
          >
            <div
              v-for="(cell, index) in board"
              :key="index"
              @click="
                currentPowerUp === 'bomb'
                  ? handleBombTarget(index)
                  : handleSwapTarget(index)
              "
              :class="[
                'aspect-square rounded-lg flex items-center justify-center text-xl font-bold transition-all',
                cell === 'X'
                  ? 'text-cyan-400 bg-gray-700'
                  : cell === 'O'
                  ? 'text-pink-400 bg-gray-700'
                  : 'bg-gray-600 cursor-not-allowed',
                currentPowerUp === 'bomb'
                  ? selectedCell === index
                    ? 'ring-2 ring-yellow-400'
                    : ''
                  : currentPowerUp === 'swap'
                  ? selectedCells.includes(index)
                    ? 'ring-2 ring-yellow-400'
                    : ''
                  : '',
              ]"
            >
              <div
                v-if="cell === 'X'"
                class="transform transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div
                v-if="cell === 'O'"
                class="transform transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="6" stroke-width="2" />
                </svg>
              </div>
            </div>
          </div>
          <div v-if="selectedCells.length === 2" class="mt-4">
            <button
              @click="executeSwap"
              class="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition-colors"
            >
              Swap Selected Cells
            </button>
          </div>
        </div>
        <div v-if="currentPowerUp === 'freeze'">
          <p class="mb-4">
            You've used Freeze! Your opponent's next turn will be skipped.
          </p>
          <button
            @click="applyFreeze"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Confirm Freeze
          </button>
        </div>
        <div class="mt-4 flex justify-end absolute top-0 right-2">
          <button
            @click="cancelPowerUp"
            class="px-4 py-2 bg-gray-600 hover:bg-white hover:text-black font-bold cursor-alias rounded-md transition-colors"
          >
            X
          </button>
        </div>
      </div>
    </div>
    <!-- Footer -->
<footer class="mt-1  text-gray-300 py-4 px-6 text-center font-bold">
  <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
    <span>© 2025 All rights reserved</span>
    <span class="hidden sm:block text-gray-500">|</span>
    <span>Designed & Developed by <a href="https://eweis.vercel.app/" class="text-cyan-400 font-semibold">Ahmed Eweis</a></span>
  </div>
</footer>
<!-- GitHub Box -->
<a href="https://github.com/ahmedeweis" target="_blank"
  class="fixed bottom-4 left-4 flex items-center gap-2 bg-[#313847] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#3e4652] transition-all duration-300">
  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
    alt="GitHub" class="w-5 h-5 invert brightness-0">
  <span class="font-medium text-sm">GitHub</span>
</a>
<!-- Portfolio Box -->
<a href="https://falcon-core.vercel.app/" target="_blank"
  class="fixed bottom-4 left-33 flex items-center gap-2 bg-[#313847] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#3e4652] transition-all duration-300">
  <img src="../assets/imgs/brand_logo_transparent.png" alt="Portfolio"
    class="w-5 h-5 ">
  <span class="font-medium text-sm">Portfolio</span>
</a>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
// Sound effects
const clickSound = new Audio(new URL('../assets/sounds/put.mp3', import.meta.url));
const winSound = new Audio(new URL('../assets/sounds/win.mp3', import.meta.url));
const drawSound = new Audio(new URL('../assets/sounds/win.mp3', import.meta.url));
const bombSound = new Audio(new URL('../assets/sounds/momb.mp3', import.meta.url));
const freezeSound = new Audio(new URL('../assets/sounds/freez.mp3', import.meta.url));
const swapSound = new Audio(new URL('../assets/sounds/swap.mp3', import.meta.url));
// Game state
const boardSize = ref(3);
const board = ref([]);
const currentPlayer = ref(1);
const gameOver = ref(false);
const winner = ref(0);
const winningCells = ref([]);
const scores = ref({ p1: 0, p2: 0, draws: 0 });
const showAbout = ref(false);
const currentPowerUp = ref(null);
const selectedCell = ref(-1);
const selectedCells = ref([]);
// Power-ups
const player1PowerUps = ref({ freeze: 1, bomb: 1, swap: 1 });
const player2PowerUps = ref({ freeze: 1, bomb: 1, swap: 1 });
// Initialize board
const initializeBoard = () => {
  board.value = Array(boardSize.value * boardSize.value).fill('');
  currentPlayer.value = 2;
  gameOver.value = false;
  winner.value = 0;
  winningCells.value = [];
  currentPowerUp.value = null;
  selectedCell.value = -1;
  selectedCells.value = [];
};
// Set board size
const setBoardSize = (size) => {
  boardSize.value = size;
  initializeBoard();
};
// Check for win
const checkWin = () => {
  const size = boardSize.value;
  const boardCopy = [...board.value];
  // Check rows
  for (let i = 0; i < size; i++) {
    let rowWinner = boardCopy[i * size];
    if (rowWinner === '') continue;
    let isWin = true;
    let winCells = [i * size];
    for (let j = 1; j < size; j++) {
      if (boardCopy[i * size + j] !== rowWinner) {
        isWin = false;
        break;
      }
      winCells.push(i * size + j);
    }
    if (isWin) {
      winningCells.value = winCells;
      return rowWinner === 'X' ? 1 : 2;
    }
  }
  // Check columns
  for (let j = 0; j < size; j++) {
    let colWinner = boardCopy[j];
    if (colWinner === '') continue;
    let isWin = true;
    let winCells = [j];
    for (let i = 1; i < size; i++) {
      if (boardCopy[i * size + j] !== colWinner) {
        isWin = false;
        break;
      }
      winCells.push(i * size + j);
    }
    if (isWin) {
      winningCells.value = winCells;
      return colWinner === 'X' ? 1 : 2;
    }
  }
  // Check diagonals
  let diag1Winner = boardCopy[0];
  if (diag1Winner !== '') {
    let isWin = true;
    let winCells = [0];
    for (let i = 1; i < size; i++) {
      if (boardCopy[i * size + i] !== diag1Winner) {
        isWin = false;
        break;
      }
      winCells.push(i * size + i);
    }
    if (isWin) {
      winningCells.value = winCells;
      return diag1Winner === 'X' ? 1 : 2;
    }
  }
  let diag2Winner = boardCopy[size - 1];
  if (diag2Winner !== '') {
    let isWin = true;
    let winCells = [size - 1];
    for (let i = 1; i < size; i++) {
      if (boardCopy[i * size + (size - 1 - i)] !== diag2Winner) {
        isWin = false;
        break;
      }
      winCells.push(i * size + (size - 1 - i));
    }
    if (isWin) {
      winningCells.value = winCells;
      return diag2Winner === 'X' ? 1 : 2;
    }
  }
  // Check for draw
  if (!boardCopy.includes('')) {
    return 0; // Draw
  }
  return -1; // Game ongoing
};
// Handle cell click
const handleCellClick = (index) => {
  if (gameOver.value || board.value[index] !== '' || currentPowerUp.value !== null) return;
  clickSound.play(); // 🔊 صوت الضغط
  board.value[index] = currentPlayer.value === 1 ? 'X' : 'O';
  const result = checkWin();
  if (result !== -1) {
    if (result === 0) drawSound.play(); // تعادل
    else winSound.play(); // فوز
    gameOver.value = true;
    winner.value = result;
    if (result === 1) scores.value.p1++;
    else if (result === 2) scores.value.p2++;
    else scores.value.draws++;
    return;
  }
if (skipNextTurn.value) {
  // الخصم يتخطى دوره
  skipNextTurn.value = false;
  // نفس اللاعب يلعب تاني ✅
} else {
  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
}
};
// Use power-up
const usePowerUp = (powerUp) => {
  if (currentPowerUp.value !== null) return;
  const playerPowerUps = currentPlayer.value === 1 ? player1PowerUps : player2PowerUps;
  if (playerPowerUps[powerUp] <= 0) return;
  currentPowerUp.value = powerUp;
};
// Handle bomb target
const handleBombTarget = (index) => {
  if (board.value[index] === '') return;
  selectedCell.value = index;
};
// Apply bomb
const applyBomb = () => {
  if (selectedCell.value === -1 || board.value[selectedCell.value] === '') return;
  bombSound.play(); // 💣
  board.value[selectedCell.value] = '';
  const playerPowerUps = currentPlayer.value === 1 ? player1PowerUps.value : player2PowerUps.value;
  playerPowerUps.bomb--;
  currentPowerUp.value = null;
  selectedCell.value = -1;
  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
};
// Handle swap target
const handleSwapTarget = (index) => {
  if (board.value[index] === '') return;
  if (selectedCells.value.includes(index)) {
    selectedCells.value = selectedCells.value.filter(cell => cell !== index);
  } else {
    if (selectedCells.value.length < 2) {
      selectedCells.value.push(index);
    }
  }
};
// Execute swap
const executeSwap = () => {
  if (selectedCells.value.length !== 2) return;
  swapSound.play(); // 🔄
  const [cell1, cell2] = selectedCells.value;
  const temp = board.value[cell1];
  board.value[cell1] = board.value[cell2];
  board.value[cell2] = temp;
  const playerPowerUps = currentPlayer.value === 1 ? player1PowerUps.value : player2PowerUps.value;
  playerPowerUps.swap--;
  // ✅ بعد السواب نتحقق من الفوز
  const result = checkWin();
  if (result !== -1) {
    if (result === 0) drawSound.play();
    else winSound.play();
    gameOver.value = true;
    winner.value = result;
    if (result === 1) scores.value.p1++;
    else if (result === 2) scores.value.p2++;
    else scores.value.draws++;
    return;
  }
  currentPowerUp.value = null;
  selectedCells.value = [];
  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
};
// Apply freeze
const skipNextTurn = ref(false);
const applyFreeze = () => {
  const playerPowerUps = currentPlayer.value === 1 ? player1PowerUps.value : player2PowerUps.value;
  freezeSound.play();
  playerPowerUps.freeze--;
  skipNextTurn.value = true; // ✅ المرة الجاية هنتخطى الخصم
  currentPowerUp.value = null;
};
// Cancel power-up
const cancelPowerUp = () => {
  currentPowerUp.value = null;
  selectedCell.value = -1;
  selectedCells.value = [];
};
// Start new round
const startNewRound = () => {
  initializeBoard();
};
// Reset game
const resetGame = () => {
  initializeBoard();
  scores.value = { p1: 0, p2: 0, draws: 0 };
  player1PowerUps.value = { freeze: 3, bomb: 2, swap: 1 };
  player2PowerUps.value = { freeze: 3, bomb: 2, swap: 1 };
};
// Toggle fullscreen
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
// Watch for power-up actions
watch(currentPowerUp, (newVal) => {
  if (newVal === 'bomb') {
    selectedCell.value = -1;
  } else if (newVal === 'swap') {
    selectedCells.value = [];
  }
});
// Initialize game
onMounted(() => {
  initializeBoard();
});
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>