package com.electro;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Test {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    private static final Path IMAGE_DIR = Paths.get(System.getProperty("user.dir")).resolve("image-dir");
    public static void main(String[] args) throws IOException {
        String current = System.getProperty("user.dir");
        System.out.println("Current working directory in Java : " + current);

        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
//        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
//            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
//        }

        System.out.println(imagePath.resolve("aaa.jpg").toString());
        System.out.println(Paths.get(System.getProperty("user.dir")).resolve("image-dir"));

        Path targetLocation = Files.createTempFile(IMAGE_DIR, "img-", ".jpg");
        System.out.println(targetLocation);
        System.out.println(targetLocation.getFileName());
    }

}