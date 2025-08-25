    const {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
    } = require('discord.js');

    module.exports = {
    data: new SlashCommandBuilder()
        .setName('duelz')
        .setDescription('Duelo con un usuario.')
        .addUserOption(option =>
        option
            .setName('oponente')
            .setDescription('El usuario al que quieres retar')
            .setRequired(true)
        ),

    async execute(interaction) {
        try {
        const retador = interaction.user;
        const oponente = interaction.options.getUser('oponente');

        // Validaciones
        if (oponente.bot) {
            return interaction.reply({ content: '❌ No puedes retar a un bot.', ephemeral: true });
        }
        if (oponente.id === retador.id) {
            return interaction.reply({ content: '❌ No puedes retarte a ti mismo.', ephemeral: true });
        }

        // Botones
        const aceptar = new ButtonBuilder()
            .setCustomId('aceptar')
            .setLabel('Aceptar Duelo')
            .setStyle(ButtonStyle.Success);

        const cancelar = new ButtonBuilder()
            .setCustomId('cancelar')
            .setLabel('Te cagas')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(aceptar, cancelar);

        // Enviar mensaje y obtenerlo para crear el collector sobre él
        const msg = await interaction.reply({
            content: `⚔️ ${oponente}, has sido retado por ${retador}.\n¿Aceptas el duelo o te cagas?`,
            components: [row],
            fetchReply: true, 
        });

        // Solo el oponente puede pulsar, y solo en este mensaje
        const filter = i => i.user.id === oponente.id && i.message.id === msg.id;

        const collector = msg.createMessageComponentCollector({
            filter,
            componentType: ComponentType.Button,
            time: 15_000,
        });

        collector.on('collect', async i => {
            if (i.customId === 'aceptar') {
            const numRetador = Math.floor(Math.random() * 100) + 1;
            const numOponente = Math.floor(Math.random() * 100) + 1;

            let resultado;
            if (numRetador > numOponente) {
                resultado = `🏆 ¡${retador} ha ganado el duelo contra ${oponente}!\n(${retador} obtuvo **${numRetador}** vs ${oponente} obtuvo **${numOponente}**)`;
            } else if (numRetador < numOponente) {
                resultado = `🏆 ¡${oponente} ha ganado el duelo contra ${retador}!\n(${oponente} obtuvo **${numOponente}** vs ${retador} obtuvo **${numRetador}**)`;
            } else {
                resultado = `🤝 ¡El duelo entre ${retador} y ${oponente} terminó en empate!\n(${numRetador} vs ${numOponente})`;
            }

            await i.update({ content: resultado, components: [] });
            collector.stop();
            } else if (i.customId === 'cancelar') {
            await i.update({
                content: `❌ ${oponente} se cagó en el duelo contra ${retador}.`,
                components: [],
            });
            collector.stop();
            }
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
            await interaction.editReply({
                content: `⌛ ${oponente} no respondió al duelo. Se cancela.`,
                components: [],
            });
            }
        });
        } catch (err) {
        console.error('duelz execute error:', err);

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply('⚠️ Ocurrió un error al ejecutar este comando.');
        } else {
            await interaction.reply({ content: '⚠️ Ocurrió un error al ejecutar este comando.', ephemeral: true });
        }
        }
    },
    };