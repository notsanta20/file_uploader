const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);
const getSize = require(`../configs/getSize`);

async function vault(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      const foldersData = await prisma.folders.findMany({
        where: {
          usersId: req.user.id,
          parentId: null,
        },
        include: {
          children: true,
        },
      });

      const filesData = await prisma.files.findMany({
        where: {
          usersId: req.user.id,
          folderId: null,
        },
      });

      filesData.forEach((d) => {
        const time = format(d.date, `MMMM dd, yyyy`);
        const size = getSize(d.size);
        d.date = time;
        d.size = size;
      });

      res.render(`vault`, {
        folders: foldersData,
        files: filesData,
        reqParams: "/vault",
        folderQuery: "/",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = vault;
