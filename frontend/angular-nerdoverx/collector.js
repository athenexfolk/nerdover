const fs = require('fs/promises');
const path = require('path');

async function generateRoutes() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "/public/api/menu.json"),
      "utf8",
    );
    const menus = JSON.parse(file);

    const routes = menus.flatMap((category) =>
      category.lessons.map(
        (lesson) => `/lessons/${category.slug}/${lesson.slug}`,
      ),
    );

    const routesText = routes.join("\n");

    await fs.writeFile(
      path.join(process.cwd(), "routes.txt"),
      routesText,
      "utf8",
    );
    console.log("routes.txt generated successfully.");
  } catch (error) {
    console.error("Error generating routes.txt:", error);
  }
}

generateRoutes();
