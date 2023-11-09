
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from "expo-document-picker";
import { useState } from 'react';
import { ExportJSONData, MeditationPlayer } from '../types';
import { Platform } from 'react-native';
import { NAME_FILE_JSON, PlatformEnum } from '../const';
import { shareAsync } from 'expo-sharing';

export const useFileSystem = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const exportFileJSON = async (data: ExportJSONData) => {
    if (Platform.OS === PlatformEnum.Android) {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;

        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          NAME_FILE_JSON.replace(".json", ""),
          "application/json"
        );
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
          encoding: FileSystem.EncodingType.UTF8,
        });
      } else {
        alert("You must allow permission to save.");
      }
    }

    if (Platform.OS === PlatformEnum.IOS) {
      const fileUri = FileSystem.documentDirectory + NAME_FILE_JSON;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const UTI = NAME_FILE_JSON;
      await shareAsync(fileUri, { UTI });
    }
  };

  const importFileJSON = async () => {
    let parsedData = { likes: {}, notes: [], trackers: {} };
    const fileInfo = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (fileInfo.type === "success") {
      const data = await FileSystem.readAsStringAsync(fileInfo.uri);
      parsedData = JSON.parse(data);
    }

    return parsedData;
  };

  const createDirectory = async (nameDirectory: string) => {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + `${nameDirectory}/`);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + `${nameDirectory}/`, { intermediates: true });
    }
  };

  const getTotalCapacity = async () => {
    const total = await FileSystem.getTotalDiskCapacityAsync();

    return total;
  };

  const getFreeCapacity = async () => {
    const free = await FileSystem.getFreeDiskStorageAsync();

    return free;
  };

  const getDownloadCapacityMeditations = async (meditations: MeditationPlayer[]) => {
    let totalSizeMeditations = 0;

    for (const meditation of meditations) {
      const { size } = await FileSystem.getInfoAsync(meditation.url) as { size: number };
      totalSizeMeditations += size;
    }

    return totalSizeMeditations;
  };

  const deleteAllMeditations = async (meditations: MeditationPlayer[]) => {
    for (const meditation of meditations) {
      await FileSystem.deleteAsync(meditation.url);
    }
  };

  const deleteFile = async (nameDirectory: string) => {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + `${nameDirectory}/`);

    if (dirInfo.exists) {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + `${nameDirectory}/`);
    }
  };

  const getFilePath = (nameDirectory: string, nameWithExtension: string) => {
    return FileSystem.documentDirectory + `${nameDirectory}/` + nameWithExtension;
  };

  const downloadResumable = (urlFile: string, nameDirectory: string, nameWithExtension: string) => {
    return FileSystem.createDownloadResumable(
    urlFile,
    FileSystem.documentDirectory + `${nameDirectory}/` + nameWithExtension,
    {},
    (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;

      if (nameWithExtension.split('.')[1] === 'mp3') {
        setDownloadProgress(Number(progress.toFixed(2)));
      }
    })
  };

  const download = async (urlFile: string, nameDirectory: string, nameWithExtension: string) => {
    const { uri } = await downloadResumable(urlFile, nameDirectory, nameWithExtension).downloadAsync() as FileSystem.FileSystemDownloadResult;

    return uri;
  };

  const downloadJSON = async (nameDirectory: string, nameWithExtension: string, data: Object) => {
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `${nameDirectory}/` + nameWithExtension, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  };

  const readJSON = async (path: string) => {
    const data = await FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return data;
  };

  return {
    downloadProgress,
    download,
    deleteFile,
    getFilePath,
    createDirectory,
    downloadJSON,
    readJSON,
    getTotalCapacity,
    getFreeCapacity,
    getDownloadCapacityMeditations,
    deleteAllMeditations,
    exportFileJSON,
    importFileJSON,
  };
};