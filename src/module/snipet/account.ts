import getTbaConnect from "../connect/getTbaConnect";
import getTokenConnect from "../connect/getToken";
import utils from "../common/utils";
import commonSnipet from "../snipet/common";

const showAccount = async (eoa, tbaOwner, parent) => {
  {
    const accountElm = document.createElement("div");
    accountElm.classList.add("accountElm");
    parent.appendChild(accountElm);

    if (tbaOwner) {
      const tbaToken = await getTbaConnect.checkToken(eoa);
      const tokenUri = await getTokenConnect.getToken(
        "tokenURI",
        tbaToken[1],
        tbaToken[2]
      );
      // ===============================================
      const tokenInfo = await utils.fetchData(tokenUri);
      const image = document.createElement("img");
      image.classList.add("ownerProfPictIcon");
      image.src = tokenInfo.image;
      if (
        image.src ==
        "https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png"
      ) {
        image.src = "https://bizen.sbs/img/alt.jpg";
      }
      accountElm.appendChild(image);

      const accountInfo = document.createElement("div");
      accountInfo.classList.add("accountInfo");
      parent.appendChild(accountElm);
      accountInfo.appendChild(commonSnipet.span("TBA : "));
      accountInfo.appendChild(commonSnipet.eoa(eoa));
      accountInfo.appendChild(commonSnipet.br());

      const tbaTokenElement = document.createElement("span");
      tbaTokenElement.innerHTML =
        "NFT : <a href='/tokens/" +
        tbaToken[1] +
        "/" +
        tbaToken[2] +
        "'>" +
        tokenInfo.name +
        "</a>";
      accountInfo.appendChild(tbaTokenElement);
      accountInfo.appendChild(commonSnipet.br());
      const tbaOwnerElement = document.createElement("span");
      tbaOwnerElement.appendChild(commonSnipet.span("NFT owner : "));
      tbaOwnerElement.appendChild(
        commonSnipet.eoa(tbaOwner, {
          link: "/account/" + tbaOwner,
          target: "",
          icon: "copy",
        })
      );
      await utils.getUserByEoa(tbaOwner).then((eoaUser) => {
        if (eoaUser.type == "discordConnect") {
          tbaOwnerElement.appendChild(
            commonSnipet.getDiscordUserSnipet(
              eoaUser.discordUser,
              "span",
              "discordNameDisp"
            )
          );
        }
      });
      accountInfo.appendChild(tbaOwnerElement);
      accountElm.appendChild(accountInfo);
    } else {
      utils.getUserByEoa(eoa).then(async (eoaUser) => {
        if (eoaUser.type == "discordConnect") {
          const image = document.createElement("img");
          image.classList.add("ownerProfPictIcon");
          image.src = eoaUser.discordUser.Icon;
          if (
            image.src ==
            "https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png"
          ) {
            image.src = "https://bizen.sbs/img/alt.jpg";
          }
          accountElm.appendChild(image);
          const accountInfo = document.createElement("div");
          accountInfo.classList.add("accountInfo");
          accountInfo.appendChild(commonSnipet.span("EOA : "));
          accountInfo.appendChild(commonSnipet.eoa(eoa));
          accountInfo.appendChild(commonSnipet.br());
          accountInfo.appendChild(commonSnipet.span("Discord :"));
          accountInfo.appendChild(
            commonSnipet.getDiscordUserSnipet(
              eoaUser.discordUser,
              "span",
              "discordNameDisp"
            )
          );
          accountInfo.appendChild(commonSnipet.br());
          accountElm.appendChild(accountInfo);
        } else {
          const accountInfo = document.createElement("div");
          accountInfo.classList.add("accountInfo");
          accountInfo.appendChild(commonSnipet.span("EOA : "));
          accountInfo.appendChild(commonSnipet.eoa(eoa));
          accountInfo.appendChild(commonSnipet.br());
          accountElm.appendChild(accountInfo);
        }
      });
    }
  }
};
const account = { showAccount };

export default account;
