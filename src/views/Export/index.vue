<template>
  <div class="container mx-auto px-4">
    <div
      class="w-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2 mt-2"
    >
      <div
        class="relative w-full h-20 border border-solid border-slate-300 text-slate-300 rounded bg-zinc-400"
        @click="openNewItemModal()"
      >
        <div class="absolute m-auto inset-0 w-fit h-fit">
          <span class="text-white font-bold tracking-wider">+ 匯出商品紀錄</span>
        </div>
      </div>
    </div>

    <div
      class="w-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2 mt-2"
    >
      <div class="w-full bg-zinc-300 text-zinc-800 rounded bg-white p-2 text-left">匯出狀態：</div>
      <div ref="readDataStatus" class="w-full text-zinc-800 rounded bg-white p-2 text-left">
        讀取資料中 ... 完成
      </div>
      <div ref="convertDataStatus" class="w-full text-zinc-800 rounded bg-white p-2 text-left">
        轉換資料中 ... 完成
      </div>
      <div ref="exportDataStatus" class="w-full text-zinc-800 rounded bg-white p-2 text-left">
        匯出 Excel 中 ... 完成
      </div>
      <div ref="allReadyStatus" class="w-full text-zinc-800 rounded bg-white p-2 text-left">
        匯出程序已完成 ...
        <span class="text-green-800" @click="exportExcel()">開啟檔案</span>
      </div>
    </div>
  </div>
  <canvas ref="photoCanvas" width="50" height="50"></canvas>
</template>

<script>
import { ref } from 'vue';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  name: 'ExportCompo',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const photoCanvas = ref(null);

    const newImg = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image(50, 50);
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('加載失敗'));
        img.src = src;
      });
    };

    const getImage = async (src) => {
      const img = await newImg(src);
      return img;
    };

    const exportExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      workbook.addWorksheet('Product', {
        views: [
          {
            activeCell: 'A1',
            showGridLines: false,
            state: 'frozen',
            ySplit: 1,
          },
        ],
      });

      const worksheet = workbook.getWorksheet(1);
      // worksheet.properties.defaultRowHeight = 50; // row height
      // worksheet.getRow(2).height = 50;
      worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'Image', key: 'img', width: 10 },
      ];

      // Alignment
      const columnIdx = [1, 2, 3];
      const firstRows = worksheet.getRow(1);
      columnIdx.forEach((col) => {
        firstRows.getCell(col).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });

      const dataList = [
        { id: 1, name: 'John Doe', img: 'lemon.jpg' },
        { id: 2, name: 'Jane Doe', img: 'pickle.jpg' },
      ];

      for (let i = 0; i < dataList.length; i += 1) {
        worksheet.addRow({ id: dataList[i].id, name: dataList[i].name });

        // Alignment
        const rows = worksheet.getRow(i + 2);
        rows.height = 50; // row height
        columnIdx.forEach((col) => {
          rows.getCell(col).alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
        });

        const getCanvas = photoCanvas.value;
        const ctx = getCanvas.getContext('2d');
        const imgSrc = `/src/assets/uploads/${dataList[i].img}`;
        getImage(imgSrc)
          .then((img) => {
            console.log('img', img);
            ctx.drawImage(img, 0, 0, 50, 50);
            const dataBase64URL = getCanvas.toDataURL();

            return dataBase64URL;
          })
          .then((base64url) => {
            const imageId = workbook.addImage({
              base64: base64url,
              extension: 'png',
            });
            // worksheet.addImage(imageId, `C${i + 2}:C${i + 2}`);
            worksheet.addImage(imageId, {
              tl: { col: 2, row: i + 1 },
              ext: { width: 50, height: 50 },
              hyperlinks: {
                hyperlink: 'https://www.google.com.tw/',
                tooltip: 'https://www.google.com.tw/',
              },
            });

            if (i === dataList.length - 1) {
              const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              const downloadDate = new Date().toISOString().substring(0, 10).replaceAll('-', '');
              const filename = `${downloadDate}下載_RePur_商品紀錄.xlsx`;
              workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: fileType });
                saveAs(blob, filename);
              });
            }
          });
      }
    };

    return {
      photoCanvas,
      exportExcel,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
