const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const path = require(`path`);

async function shareFile(req, res, next) {
  try {
    const { shareId } = req.params;

    const file = await prisma.files.findFirst({
      where: {
        id: shareId,
      },
    });

    const filePath = path.join(__dirname, `../`, file.path);

    res.download(filePath, file.name, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = shareFile;
