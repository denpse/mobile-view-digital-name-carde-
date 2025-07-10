import React from "react";

import {
  Badge,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardItem } from "@/types/card-type";
import { IUser } from "@/types/user-type";

const CorporateCard = ({
  me,
  card,
  idx,
}: {
  me: IUser;
  card: CardItem;
  idx: number;
}) => {
  return (
    <div>
      {/* <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 p-4"> */}
      <div className="max-w-sm mx-auto space-y-4">
        {/* Creative Card */}

        <div key={idx}>
          <Card className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-0 shadow-2xl backdrop-blur-sm">
            <Link href={`/update-card/${card.id}`}>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-4 right-4 border-white text-white hover:bg-white/10 bg-white/20"
              >
                Edit
              </Button>
            </Link>
            <CardContent className="p-0 relative overflow-hidden">
              {/* Artistic Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full translate-x-16 translate-y-16"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-x-12 -translate-y-12"></div>
              </div>

              <div className="relative z-10 p-6">
                {/* Creative Header */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={me?.data?.avatar}
                          alt={me?.data?.user_name}
                        />
                        <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {me?.data?.user_name}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2 tracking-tight">
                    {me?.data.full_name}
                  </h1>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full inline-block transform -rotate-1">
                    <span className="text-sm font-bold">{card.job}</span>
                  </div>
                </div>

                {/* Company Badge */}
                <div className="text-center mb-4">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-0 px-3 py-1 transform rotate-1">
                    {card.company}
                  </Badge>
                </div>

                {/* Bio with Creative Styling */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
                  <p className="text-white text-sm leading-relaxed text-center font-medium">
                    {card.bio}
                  </p>
                </div>

                {/* Contact Info - Creative Layout */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/30">
                    <Phone className="w-4 h-4 text-yellow-400 mb-1" />
                    <p className="text-xs text-purple-200 mb-1">Call Me</p>
                    <p className="text-sm text-white font-mono">{card.phone}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-3 border border-pink-400/30">
                    <Mail className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-xs text-pink-200 mb-1">Email Me</p>
                    <p className="text-sm text-white break-all ">
                      {me?.data?.email}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-3 border border-cyan-400/30">
                    <Globe className="w-4 h-4 text-green-400 mb-1" />
                    <p className="text-xs text-cyan-200 mb-1">Visit</p>
                    <p className="text-sm text-white ">{card.web_site}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-3 border border-green-400/30">
                    <MapPin className="w-4 h-4 text-orange-400 mb-1" />
                    <p className="text-xs text-green-200 mb-1">Find Me</p>
                    <p className="text-sm text-white text-xs">{card.address}</p>
                  </div>
                </div>

                {/* Creative Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={async () => {
                      const toBase64 = async (url: string) => {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            resolve(
                              reader.result?.toString().split(",")[1] || ""
                            );
                          reader.onerror = reject;
                          reader.readAsDataURL(blob);
                        });
                      };

                      const avatarBase64 = me?.data.avatar
                        ? await toBase64(me?.data.avatar)
                        : "";

                      const vcard = [
                        "BEGIN:VCARD",
                        "VERSION:3.0",
                        `FN:${me?.data.full_name}`,
                        `N:${me?.data.full_name};;;;`,
                        `ORG:${card.company}`,
                        `TITLE:${card.job}`,
                        `TEL;TYPE=WORK,VOICE:${card.phone}`,
                        `EMAIL;TYPE=PREF,INTERNET:${me?.data.email}`,
                        avatarBase64
                          ? `PHOTO;ENCODING=b;TYPE=JPEG:${avatarBase64}`
                          : "",
                        `URL:${card.web_site}`,
                        `ADR;TYPE=WORK:;;${card.address};;;;`,
                        `NOTE:${card.bio}`,
                        "END:VCARD",
                      ]
                        .filter(Boolean)
                        .join("\r\n");

                      const blob = new Blob([vcard], {
                        type: "text/vcard;charset=utf-8",
                      });

                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      // link.download = `${me?.data.full_name.replace(
                      //   " ",
                      //   "_"
                      // )}_${idx + 1}.vcf`;
                      link.download = `${(
                        me?.data.full_name ?? "Unnamed_User"
                      ).replace(" ", "_")}_${idx + 1}.vcf`;

                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold border-0 shadow-lg transform hover:scale-105 transition-transform"
                  >
                    <Download className="w-4 h-4 mr-2" />✨ Save My Contact ✨
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 font-bold bg-transparent"
                    >
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400/20 font-bold bg-transparent"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CorporateCard;
