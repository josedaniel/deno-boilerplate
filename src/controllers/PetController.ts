import { Context } from "oak";
import { Pet } from "../models/Pet.ts";

// 🐾 Pet controller with CRUD operations
export class PetController {
  // 📋 Get all pets
  static async getAll(ctx: Context) {
    try {
      const pets = await Pet.findAll();
      ctx.response.body = pets;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to retrieve pets", details: error.message };
    }
  }

  // 🔍 Get pet by ID
  static async getById(ctx: Context) {
    try {
      const id = ctx.params.id;
      const pet = await Pet.findByPk(id);

      if (!pet) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Pet not found" };
        return;
      }

      ctx.response.body = pet;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to retrieve pet", details: error.message };
    }
  }

  // ➕ Create new pet
  static async create(ctx: Context) {
    try {
      const body = ctx.request.body;

      if (body.type !== "json") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request body must be JSON" };
        return;
      }

      const petData = await body.value;

      // Validate type field
      if (petData.type !== "mamifero" && petData.type !== "reptil") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Type must be 'mamifero' or 'reptil'" };
        return;
      }

      const pet = await Pet.create(petData);
      ctx.response.status = 201;
      ctx.response.body = pet;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to create pet", details: error.message };
    }
  }

  // 🔄 Update pet
  static async update(ctx: Context) {
    try {
      const id = ctx.params.id;
      const body = ctx.request.body;

      if (body.type !== "json") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request body must be JSON" };
        return;
      }

      const petData = await body.value;

      // Validate type field if provided
      if (petData.type && petData.type !== "mamifero" && petData.type !== "reptil") {
        ctx.response.status = 400;
        ctx.response.body = { error: "Type must be 'mamifero' or 'reptil'" };
        return;
      }

      const pet = await Pet.findByPk(id);

      if (!pet) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Pet not found" };
        return;
      }

      await pet.update(petData);
      ctx.response.body = pet;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to update pet", details: error.message };
    }
  }

  // ❌ Delete pet
  static async delete(ctx: Context) {
    try {
      const id = ctx.params.id;
      const pet = await Pet.findByPk(id);

      if (!pet) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Pet not found" };
        return;
      }

      await pet.destroy();
      ctx.response.status = 204; // No content
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to delete pet", details: error.message };
    }
  }
}