import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useState } from "react";
import AvatarSelector from "./AvatarSelector";

const UserConfigForm = () => {
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  return (
    <div className="flex flex-col items-stretch">
      <div>
        ¿Quién eres? Dinos tu nombre y elige un avatar para que los demás te
        reconozcan.
      </div>

      <div className="mt-4">
        <label
          className="text-sm font-bold ml-3 mb-2 inline-block"
          htmlFor="name"
        >
          Nombre
        </label>
        <Input
          placeholder="Escribe tu nombre"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div>
        <span className="text-sm font-bold mt-4 ml-3 mb-2 block">Avatar</span>
        <AvatarSelector onChange={(a) => setAvatar(a)} value={avatar} />
      </div>

      <Button className="ml-auto mt-4" disabled={!name || !avatar}>
        Continuar
      </Button>
    </div>
  );
};

export default UserConfigForm;
