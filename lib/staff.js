import {Journalist, Staff, Editor, staffTypes } from './datastructures/Staff';

async function getAllWriters() {
  try {
    const res = await fetch(`https://the-lower-moreland-spectator.vercel.app/api/writers`)
    const json = await res.json()
    return JSON.stringify(json);
  } catch {
    return JSON.stringify({
      writers: []
    });
  }
}

async function getWriter(name) {
    return JSON.parse(await getAllWriters()).writers.find(item => item.name == name);
}

/**
 * Gets a writer by its id
 * @param {number} id
 * @returns {Journalist} the Journalist object with the specified ID 
 */
async function getWriterById(id) {
    return JSON.parse(await getAllWriters()).writers.find(item => item.id == id);
}

export { getAllWriters, getWriter, getWriterById }