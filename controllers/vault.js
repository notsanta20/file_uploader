const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vault(req, res, next) {
  const auth = req.isAuthenticated();
  if (auth) {
    const foldersData = await prisma.folders.findMany({
      where: {
        usersId: req.user.id,
      },
    });
    const filesData = await prisma.files.findMany({
      where: {
        usersId: req.user.id,
        location: `/`,
      },
    });
    filesData.forEach((d) => {
      const time = format(d.date, `MMMM dd, yyyy`);
      d.date = time;
    });
    res.render(`vault`, {
      folders: foldersData,
      data: filesData,
      reqParams: "vault",
      url: "/",
    });
  } else {
    res.redirect(`/`);
  }
}

module.exports = vault;
