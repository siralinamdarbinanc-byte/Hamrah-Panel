import { FragmentPacket, KvSettings } from '#types/settings';

/**
 * Per-ISP presets, applied per-request via the subscription URL: `...?app=xray&isp=mci`
 * They only override the generated config; stored panel settings are never modified.
 *
 * NOTE: Values are starting points, not verified guarantees. Filtering differs by city,
 * time and line type and changes often. Prefer the "Smart Fragment" config to discover
 * what works on a given line, then copy the winner into `custom` or a profile here.
 */
export type IspKey = 'mci' | 'irancell' | 'tci' | 'rightel' | 'custom';

export const ISP_PROFILES: Record<Exclude<IspKey, 'custom'>, Partial<KvSettings>> = {
    // Hamrah-e Aval (mobile)
    mci: {
        fragmentPackets: 'tlshello',
        fragmentLengthMin: 10,
        fragmentLengthMax: 30,
        fragmentDelayMin: 5,
        fragmentDelayMax: 10,
        ports: [443, 8443, 2053, 2096],
        bestPingInterval: 15,
        fingerprint: 'chrome'
    },
    // Irancell (mobile)
    irancell: {
        fragmentPackets: 'tlshello',
        fragmentLengthMin: 20,
        fragmentLengthMax: 60,
        fragmentDelayMin: 5,
        fragmentDelayMax: 15,
        ports: [443, 2083, 2087, 8443],
        bestPingInterval: 15,
        fingerprint: 'chrome'
    },
    // TCI / Mokhaberat (ADSL / fibre / Wi-Fi)
    tci: {
        fragmentPackets: 'tlshello',
        fragmentLengthMin: 100,
        fragmentLengthMax: 200,
        fragmentDelayMin: 1,
        fragmentDelayMax: 3,
        ports: [443, 8443],
        bestPingInterval: 30,
        fingerprint: 'chrome'
    },
    // Rightel (mobile)
    rightel: {
        fragmentPackets: 'tlshello',
        fragmentLengthMin: 20,
        fragmentLengthMax: 50,
        fragmentDelayMin: 5,
        fragmentDelayMax: 10,
        ports: [443, 8443, 2053],
        bestPingInterval: 20,
        fingerprint: 'chrome'
    }
};

const PACKETS: FragmentPacket[] = ['tlshello', '1-1', '1-2', '1-3', '1-5'];

/**
 * `?isp=mci|irancell|tci|rightel` applies a profile.
 * `&packets=1-1` overrides the fragment packet (upstream's tip when `tlshello` stops working on an ISP).
 */
export function applyIspProfile(settings: KvSettings, isp: string | null, packets?: string | null): boolean {
    const key = (isp ?? '').toLowerCase() as IspKey;
    let applied = false;

    if (key && key !== 'custom' && key in ISP_PROFILES) {
        Object.assign(settings, ISP_PROFILES[key as Exclude<IspKey, 'custom'>]);
        applied = true;
    }

    if (packets && PACKETS.includes(packets as FragmentPacket)) {
        settings.fragmentPackets = packets as FragmentPacket;
        applied = true;
    }

    return applied;
}
