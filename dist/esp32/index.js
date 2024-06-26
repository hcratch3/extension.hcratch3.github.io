class Esp32_Editor {

  constructor() {}

  getInfo() { // 拡張機能の各種情報
    return {
      id: 'esp32editor',
      name: 'ESP32_Editor', // 拡張機能の名前
      blocks: [ // 各ブロックの定義
        {
            opcode: 'connected',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Connected ESP32 (baudRate:[TEXT])',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "9600"
            }
          }
        },
        {
          opcode: 'disconnect',
          text: 'Disconnected ESP32',
          blockType: Scratch.BlockType.COMMAND,
        }
      ]
    }
  }

  connected (args) {
        const text = Cast.toString(args.TEXT);
        try {
            serialPort = await navigator.serial.requestPort();
            await serialPort.open({ baudRate: text });
            alart('Connected to serial port');
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    }
    disconnected () {
        try {
            await serialPort.close();
            alart('Disconnected from serial port');
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    }
}

Scratch.extensions.register(new Esp32_Editor());
